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