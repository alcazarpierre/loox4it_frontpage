export const formsValidation = (formData) => {
    const newErrors = {};
  
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }
  
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Los apellidos son obligatorios';
    }
  
    if (!formData.documentType) {
      newErrors.documentType = 'Selecciona el tipo de documento';
    }
  
    if (!formData.documentNumber.trim()) {
      newErrors.documentNumber = 'El número de documento es obligatorio';
    } else if (formData.documentType === 'DNI' && !/^\d{8}$/.test(formData.documentNumber)) {
      newErrors.documentNumber = 'El DNI debe tener 8 dígitos numéricos';
    } else if (formData.documentType === 'CE' && !/^[a-zA-Z0-9]{9,12}$/.test(formData.documentNumber)) {
      newErrors.documentNumber = 'El CE debe tener entre 9 y 12 caracteres alfanuméricos';
    }
  
    if (!formData.phone.trim()) {
      newErrors.phone = 'El número de celular es obligatorio';
    } else if (!/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'El número de celular debe tener 9 dígitos';
    }
  
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
  
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
  
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
  
    return newErrors;
  };
  