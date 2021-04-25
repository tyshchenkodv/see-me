import * as yup from 'yup';

export const commentValidationSchema = yup.object().shape({
    text: yup
        .string()
        .min(5, 'Too short')
        .max(155, 'Too loong').required('Required'),
});
