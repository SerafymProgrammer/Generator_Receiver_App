

export const template_new_obj_default = (value) => {
    if (isNaN(value)) {
        console.log('value is NaN')
        return false
    }
    return  {data: value}
}