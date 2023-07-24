import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation(); // useNavigation() hook returns the current navigation state of the router.

  const isSubmitting = navigation.state === 'submitting'; // navigation.state is a string that can be "idle", "submitting", or "error".
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const formErrors = useActionData();

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>

          {formErrors?.phone && <p>{formErrors.phone}</p>}
          {/* formErrors is an object that contains the errors returned by the action function. */}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* JSON.stringify() converts a JavaScript object or value to a JSON string */}
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Placing Order...' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); // Object.fromEntries() method transforms a list of key-value pairs into an object.

  const order = {
    ...data,
    cart: JSON.parse(data.cart), // JSON.parse() converts a JSON string to a JavaScript object.
    priority: data.priority === 'on',
  };

  const errors = {}; // We create an empty object to store the errors.
  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you about your order.';
  } // We add an error to the errors object if the phone number is invalid.
  if (Object.keys(errors).length > 0) return errors; // If there are errors, we return them to the user.

  //If there are no errors, we create the order and redirect the user to the order page.
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
