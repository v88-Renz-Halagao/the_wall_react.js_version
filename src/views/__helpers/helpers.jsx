/*  DOCU: Show or hide the selected modal 
    Triggered: inside render() 
    Owner: Renz */
export const toggleShowModal = (component_selector, modal_name, is_show) => {
    return component_selector.setState({ [modal_name]: is_show });
}

export const generateId = () => {
    return Date.now().toString(36).substr(2);
}