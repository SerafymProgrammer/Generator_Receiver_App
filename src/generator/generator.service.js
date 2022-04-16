import DefaultTemplate from "../templates/DefaultTemplate.class";

export function get_object_by_template_by_id (id) {
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