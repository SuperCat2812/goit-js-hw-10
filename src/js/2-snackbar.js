import iziToast from 'izitoast';
const refs = {
  delay: document.querySelector('input[name="delay"]'),
  radioBtnTrue: document.querySelector('input[value="fulfilled"]'),
  radioBtnFalse: document.querySelector('input[value="rejected"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  if (refs.delay.value && (refs.radioBtnTrue.checked || refs.radioBtnFalse.checked)) {
    e.preventDefault();
    const promise = new Promise((fulfilled, reject) => {
      setTimeout(() => {
        if (refs.radioBtnTrue.checked) {
          fulfilled(refs.delay.value);
        } else {
          reject(refs.delay.value);
        }
      }, refs.delay.value);
    });

    promise
      .then(result => {
        iziToast.show({
          position: 'topRight',
          backgroundColor: 'green',
          title: `✅ Fulfilled promise in ${result}ms`,
          titleColor: '#ffff',
          titleSize: 16,
        });
      })
      .catch(error => {
        iziToast.show({
          position: 'topRight',
          backgroundColor: '#EF4040',
          title: `❌ Rejected promise in ${error}ms`,
          titleColor: '#ffff',
          titleSize: 16,
        });
      });
  }
});
