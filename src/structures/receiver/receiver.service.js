import DefaultTemplate from "../../templates/DefaultTemplate.class.js";

//receiver *service*

export function validate_object_by_template_by_id (id='default', obj) {
    // validate object by the template validation

    //here we use Regular Function, because the arrow function does not have its own "args" array

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

