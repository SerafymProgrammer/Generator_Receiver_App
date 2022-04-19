

function receiver_markup() {
    let markup = `
 
                    <h2 class="receiver_block_title">Receiver</h2>
                       <div class="receiver_block_content">
                          <div class="block_manage_en_dis">
                                     <div class="start_stop_btn_block"></div>
                                    <div class="start_stop_indicator_block"></div>
                            </div>    
                               <div class="counters_block">
                    
                              </div> 
                              <div class="state_receiving_block">
                                    <span class="label_indicator_receiving">Receiving state:</span>
                                    <div class="receiving_indicator_block"></div>
                              </div>                                            
                        </div>
           
        `;
    return markup;
}

export default receiver_markup;