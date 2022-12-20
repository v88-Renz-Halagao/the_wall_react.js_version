/*  DOCU: Show or hide the selected modal 
    Triggered: inside render() 
    Owner: Renz */
export const toggleShowModal = (component_selector, modal_name, is_show) => {
    return component_selector.setState({ [modal_name]: is_show });
}

/*  DOCU: This will generate unique id for creating messages and comments  
    Triggered: inside render() 
    Owner: Renz */
export const generateId = () => {
    let today = new Date();
    return today.getDay()+""+today.getSeconds()+""+ Math.floor(Math.random() * (100 - 0 + 1) + 0).toString();
}