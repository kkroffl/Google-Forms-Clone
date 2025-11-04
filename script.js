const scriptURL = 'https://script.google.com/macros/s/AKfycbzFvn9dcQjplFiT4nDG9EJtmD_ze2Pc5J4PKEucE13gKOZEg3u7sAGiiMYU-SLF_CEO/exec';
const form = document.getElementById('certForm');
const status = document.getElementById('status');

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const fileInput = document.getElementById('certificateFile');
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const base64String = reader.result.split(',')[1]; // remove prefix (data:...)
    const data = {
      name: form.name.value,
      employeeId: form.employeeId.value,
      email: form.email.value,
      mobile: form.mobile.value,
      courseName: form.courseName.value,
      conductedBy: form.conductedBy.value,
      duration: form.duration.value,
      academicYear: form.academicYear.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      feeAmount: form.feeAmount.value,
      certificateFile: base64String,
      certificateName: file.name
    };

    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        status.innerText = "✅ Form submitted successfully!";
        form.reset();
      })
      .catch(() => {
        status.innerText = "❌ Error submitting form";
      });
  };

  reader.readAsDataURL(file);
});
