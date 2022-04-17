import DefaultTemplate from "../templates/DefaultTemplate.class";

export function validate_object_by_template_by_id (id='default', obj) {
    let args = [...arguments]
    args.splice(0,2);

    switch (id) {
        case 'default':
        default: {
            return DefaultTemplate.isValid(obj);
            break;
        }
    }
}

export function validate_is_function (function_) {
    if (!function_||function_.constructor!==Function) {
        return ()=>console.log('function is not defined');
    }
    return function_;
}