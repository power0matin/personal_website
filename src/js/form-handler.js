document.addEventListener('DOMContentLoaded', () => {
 const form = document.getElementById('contact-form');

 const showMessage = (message, type = 'info') => {
  // For now, simple alert; can be replaced with modal/toast
  alert(message);
  console[type === 'error' ? 'error' : 'log'](message);
 };

 const postData = async (url = '', data = {}) => {
  try {
   const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
   });

   if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Request failed');
   }

   return response.json();
  } catch (err) {
   throw err;
  }
 };

 form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {
   name: formData.get('name').trim(),
   email: formData.get('email').trim(),
   message: formData.get('message').trim(),
  };

  // Basic validation
  if (!data.name || !data.email || !data.message) {
   return showMessage('Please fill out all fields.', 'error');
  }

  try {
   await postData('http://localhost:5000/api/contact', data);
   showMessage('Message sent successfully!');
   form.reset();
  } catch (error) {
   showMessage(`Failed to send message. ${error.message}`, 'error');
  }
 });
});
