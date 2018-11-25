'use strict';

class ContactTable extends React.Component {
    constructor(props) {
        super(props);
        this.newContact = {id:'', name: '', mail:'', phone: '', address: ''};
        this.contactList = props.contactList;
        this.addContact = this.addContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.showForm = this.showForm.bind(this);
        this.formTextChange = this.formTextChange.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.state = {value: ''};
    }

    addContact(event) {
        let message = '';
    
        if (this.newContact.id.trim() == '') {
            message += "Не заполнено поле ID\n";
        }

        if (this.newContact.name.trim() == '') {
            message += "Не заполнено поле ФИО\n";
        }

        if (this.newContact.mail.trim() == '') {
            message += "Не заполнено поле E-mail\n";
        }

        if (this.newContact.phone.trim() == '') {
            message += "Не заполнено поле Телефон\n";
        }

        if (this.newContact.address.trim() == '') {
            message += "Не заполнено поле Адрес \n";
        }

        if (message.length > 0) {
            alert(message);
            return;
        }

        this.contactList.push(this.newContact);
        this.setState({value: 'added'});   
    }

    deleteContact(event) {
        var contactNum = +event.target.id;
            
        if (contactNum > -1) {
            this.contactList.splice(contactNum, 1);
        }

        if (this.state.value == 'added' || this.state.value == 'deleted' || this.state.value == '') {
            this.setState({value: 'deleted'});
            return;
        }

        this.setState({value: 'show form'});
            
    }

    showForm() {
        this.newContact = {id: '', name:'', mail: '', phone: '', address: ''};
        this.setState({value: 'showForm'});
    }

    formTextChange(event) {
        let element = event.target.id;

        switch(element) {
            case 'id':
                this.newContact.id = event.target.value;
            break;
            case 'name':
                this.newContact.name = event.target.value;
            break;
            case 'mail':
                this.newContact.mail = event.target.value;
            break;
            case 'phone':
                this.newContact.phone = event.target.value;
            break;
            case 'address':
                this.newContact.address = event.target.value;
            break;
        }

        this.setState({value: event.target.value});
    }

    cancelForm() {
        this.setState({value: ''});
    }
    
    render() {
        const contactList = this.contactList;

        let addButton = <button className="button add-button" onClick={this.showForm}>Добавить</button>;
        let addForm;

        const tableHeader = <Contact type="header"/>

        const listOfBlocks = contactList.map(function (item, index) {
                return Contact.call(this, {item, index});
            }, this );
        
        if(this.state.value != 'added' && this.state.value != '' && this.state.value != 'deleted') {
            addForm = AddContactForm.call(this);
        }

        return (
            <div className="main-page">
                {addButton}
                {tableHeader}
                {listOfBlocks}
                {addForm}
            </div>
        );
    }
}

function Contact(props) {
    let type = props.type;

    if (type=='header') {
        let headerItem = {
                id:"ID", 
                name: "ФИО", 
                mail:"E-mail", 
                phone: "Телефон", 
                address: "Адрес"
            };
        
        return (
            <div className="data-block-with-delete-button header" key='header'>
                <div className="data-block">
                    <ContactString contact={headerItem}/>
                </div>
            </div>);
    }
    
    return (
    <div className="data-block-with-delete-button" key={props.index}>
        <div className="data-block">
            <ContactString contact={props.item}/>
        </div>
        <div className="button-block">
            <button className="button delete-button" id={props.index} onClick={this.deleteContact}>Удалить</button>
        </div>
    </div>);

}

function ContactString(props) {
    let contact = props.contact;
    return (
        <div className="flex-block">
            <div className="flex-block-column flex-block-id">
                <div>{contact.id}</div>
            </div>
            <div className="flex-block-column flex-block-name">
                <div>{contact.name}</div>
            </div>
            <div className="flex-block-column flex-block-mail">
                <div>{contact.mail}</div>
            </div>
            <div className="flex-block-column flex-block-phone">
                <div>{contact.phone}</div>
            </div>
            <div className="flex-block-column flex-block-address">
                <div>{contact.address}</div>
            </div>
        </div>
    );
}

function AddContactForm() {
    return(
        <div className="form">
            <h3>Add Contact</h3>
            <label>
                <div className="field-name">Id: </div>
                <div className="field">
                    <input type="text" id="id" value={this.newContact.id} onChange={this.formTextChange}/>
                </div>
            </label>
            <label>
                <div className="field-name">ФИО: </div>
                <div className="field">
                    <input type="text" id="name" value={this.newContact.name} onChange={this.formTextChange}/>
                </div>
            </label>
            <label>
                <div className="field-name">E-mail:</div>
                <div className="field">
                    <input type="text" id="mail" value={this.newContact.mail} onChange={this.formTextChange}/>
                </div>
            </label>
            <label>
                <div className="field-name">Телефон:</div>
                <div className="field">
                    <input type="text" id="phone" value={this.newContact.phone} onChange={this.formTextChange}/>
                </div>
            </label>
            <label>
                <div className="field-name">Адрес:</div>
                <div className="field">
                    <input type="text" id="address" value={this.newContact.address} onChange={this.formTextChange}/>
                </div>
            </label>
            <div className="buttons">
                <button className="button submit" onClick={this.addContact}>Добавить</button>
                <button className="button cancel" onClick={this.cancelForm}>Отмена</button>
            </div>
        </div>);
    }
  

var contactList = [];
ReactDOM.render(
    <ContactTable contactList={contactList}/>,
    document.getElementById('root')
  );
