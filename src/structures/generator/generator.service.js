import DefaultTemplate from "../../templates/DefaultTemplate.class.js";

//generator *service*

export function get_object_by_template_by_id (id) {
    // get object for generate by the template_id

    //here we use Regular Function, because the arrow function does not have its own "args" array

    let args = [...arguments]
    args.splice(0,1);

    switch (id) {
        // case id===...
        case 'default':
        default: {
            let new_object = new DefaultTemplate(...args);
            return new_object;
        }
    }
}