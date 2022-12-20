/*  DOCU: Show or hide the selected modal 
    Triggered: inside render() 
    Owner: Renz */
export const toggleShowModal = (component_selector, modal_name, is_show) => {
    return component_selector.setState({ [modal_name]: is_show });
}

/*  DOCU: This will generate id for creating messages and comments  
    Triggered: inside render() 
    Owner: Renz */
export const generateId = () => {
    return new Date().getDay() +""+ Math.floor(Math.random() * (100 - 0 + 1) + 0).toString(); 
}