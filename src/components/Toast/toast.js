import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

function showMessage(type, message) {
    Toast.fire({
        icon: type,
        title: message
    })
}

export function successMessage(message) {
    showMessage('success', message);
}

export function errorMessage(message) {
    showMessage('error', message)
}