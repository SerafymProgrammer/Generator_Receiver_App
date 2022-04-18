

export const get_indicator_status_info = (status_modifier)=>{
    switch (status_modifier) {
        case 'error':
        case 'disabled':
        {
            return {
                color: '#e01616'
            }
        }

        case 'success':
        case 'enabled':
        {
            return {
                color: '#3be016'
            }
        }
        default: {
            return {
              color: '#e01616'
            }
        }
    }
}