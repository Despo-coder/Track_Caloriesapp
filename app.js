// For this project the Modular Pattern will be employed

//Storage Controller == Storage on the information


//Item Controller
const ItemCtrl = (function(){
console.log('Item controller was called .....')
// Item Constructor
    
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structures
    const data = {
        items: [
            // { id: 0, name: 'Steak', calories: 1200},
            // { id: 1, name: 'Cookies', calories: 400},
            // { id: 2, name: 'Eggs', calories: 300},
        ],
        currentItems: null,
        totalCalories: 0

    }

    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
              
            } else {
                ID = 0;
            }
            calories = parseInt(calories);
            //Instatiate the contructor
            newItem = new Item(ID, name, calories);

            data.items.push(newItem)
            return newItem;
        },
        logData: function () {
            return data;
        }
    }
  
    
})();


//UI Controller
const UICtrl = (function(){
    console.log('UI controller was called .....')

    return {
        populateUI: function (items) {
        
            let html = '';

            items.forEach(function (item) {
                html += `
                <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} calories</em>
                <a href="#" class="secondary-content">
                <i class=" edit-item fa fa-pencil"></i>
                </a>
                </li>
                `
            })
        //Insert List Items in UI
            document.querySelector('#item-list').innerHTML = html;
        },
        getItemsInput: function () {
            return {
                name: document.querySelector('#item-name').value,
                calories: document.querySelector('#item-calories').value
            }
        },
        addnewItem: function (item) {
          //Create li Element 
            const li = document.createElement('li');
         //Add a Class to the Element
            li.className = 'collection-item';
        //Add ID of item being entered
            li.id = `item-${item.id}`;
        // Add HTML Markup to the UI
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} calories</em>
                <a href="#" class="secondary-content">
                <i class=" edit-item fa fa-pencil"></i>
                </a>
            `;
            document.querySelector('#item-list').insertAdjacentElement('beforeend', li)
        },
        clearInput: function () {
             document.querySelector('#item-name').value=''
                 document.querySelector('#item-calories').value=''
        }
    }
    
})();

//App Controller
const AppCtrl = (function(ItemCtrl,UICtrl ){

    const loadEventListeners = function () {
       
        document.querySelector('.add-btn').addEventListener('click', itemAddSubmit)
    }
    const itemAddSubmit = function (e) {
       
        const input = UICtrl.getItemsInput();
        if (input.name !== '' && input.calories !== '') {
            
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addnewItem(newItem);
            UICtrl.clearInput();
        }
        e.preventDefault();
    }

    return {
        init: function () {
            console.log('App Initializer was called...')

            //Fetch Items from the data structure
            const items = ItemCtrl.getItems()

            //Populate List with Items
            UICtrl.populateUI(items)
            loadEventListeners();
            

        }
            
        
    }

})(ItemCtrl, UICtrl);

AppCtrl.init()