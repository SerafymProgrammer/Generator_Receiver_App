

function generator_receiver_markup(container_id) {
    let markup = `
            <div 
            id="${container_id}_container"
            class="generator_receiver_container">
                       <div class="generator_block">
                       
                       </div>
                     <div class="receiver_block">
                       
                </div>
            </div>
            
        `;
    return markup;
}

export default generator_receiver_markup;