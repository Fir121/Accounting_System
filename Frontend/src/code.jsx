import $ from "jquery";

let user_data = {}
const base_url = "http://127.0.0.1:5000";

function saveToLocalStorage(){
    localStorage.setItem('user_id', user_data["user_id"]);
    localStorage.setItem('user_company_name', user_data["user_company_name"]);
}

export function redirect(loc){
    document.location.href="/"+loc;
  }

export function getUserData(){
    var user_id = localStorage.getItem('user_id');
    var user_company_name = localStorage.getItem("user_company_name");
    if (user_id === null || user_company_name === null){
        return false;
    }
    user_data["user_id"] = user_id;
    user_data["user_company_name"] = user_company_name;
    return true;
}

export function login(user_company_name){
    $.ajax({
        type: "GET",
        dataType:"json",
        url: base_url+"/read_user_login",
        data: {"user_company_name":user_company_name},
        success: function(data) {
            if (data.status == 1){
                user_data["user_id"] = data.data.user_id;
                user_data["user_company_name"] = data.data.user_company_name;
                saveToLocalStorage()
                redirect("dashboard")
            }
            else{
                // call error
            }
        },
        error: function(exp) {
            // call error
        }
    });
}

export function signup(user_company_name){
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/create_user",
        data: {"user_company_name":user_company_name},
        success: function(data) {
            if (data.status == 1){
                user_data["user_id"] = data.data.user_id;
                user_data["user_company_name"] = data.data.user_company_name;
                redirect("dashboard")
            }
            else{
                // call error
            }
        },
        error: function(exp) {
            // call error
        }
    });
}

function process_date(transaction_date){
    var pad = function(num) { return ('00'+num).slice(-2) };
    return transaction_date.getUTCFullYear()         + '-' +
    pad(transaction_date.getUTCMonth() + 1)  + '-' +
    pad(transaction_date.getUTCDate());
}

export function getTransactions(transaction_date, setData){
    transaction_date = process_date(transaction_date);
    return $.ajax({
        type: "GET",
        dataType:"json",
        url: base_url+"/get_transactions",
        data: {"user_id":user_data["user_id"], "transaction_date":transaction_date}}).then(
            function(data) {
                console.log(data);
                if (data.status == 1){
                    setData(data.data)
                    return data.data;
                }
                else{
                    return [];
                    // call error
                }
            }).fail( function(exp) {
                return [];
                // call error
        });
}

export function getDescriptions(date, setData){
    date = process_date(date);
    return $.ajax({
        type: "GET",
        dataType:"json",
        url: base_url+"/get_descriptions",
        data: {"user_id":user_data["user_id"], "date":date}}).then(
            function(data) {
                console.log(data);
                if (data.status == 1){
                    setData(data.data)
                    return data.data;
                }
                else{
                    return [];
                    // call error
                }
            }).fail( function(exp) {
                return [];
                // call error
        });
}

export function getAccounts(setData){
    return $.ajax({
        type: "GET",
        dataType:"json",
        url: base_url+"/get_accounts",
        data: {"user_id":user_data["user_id"]}}).then(
            function(data) {
                console.log(data);
                if (data.status == 1){
                    setData(data.data)
                    return data.data;
                }
                else{
                    return [];
                    // call error
                }
            }).fail( function(exp) {
                return [];
                // call error
        });
}

export function editAccountReader(account_id, setFormValue, setOpen){
    return $.ajax({
        type: "GET",
        dataType:"json",
        url: base_url+"/read_account",
        data: {"account_id":account_id}}).then(
            function(data) {
                console.log(data);
                if (data.status == 1){
                    if (data.data.account_description === null){
                        data.data.account_description = "";
                    }
                    setFormValue({
                        name: data.data.account_name,
                        type: data.data.account_type,
                        description: data.data.account_description,
                      });
                    setOpen(true);
                    return data.data;
                }
                else{
                    return [];
                    // call error
                }
            }).fail( function(exp) {
                return [];
                // call error
        });
}

export function getAccountsList(setSelectData){
    return $.ajax({
        type: "GET",
        dataType:"json",
        url: base_url+"/get_accounts",
        data: {"user_id":user_data["user_id"], "detailed":true}}).then(
            function(data) {
                console.log(data);
                if (data.status == 1){
                    setSelectData(data.data.map(item => ({
                        label: item.account_name,
                        value: item.account_id
                      })));
                    return data.data;
                }
                else{
                    return [];
                    // call error
                }
            }).fail( function(exp) {
                return [];
                // call error
        });
}

export function isEmpty(item){
    return item === null || item === "" || item === undefined
}

export function setDescription(description,description_links,setOpen,setFormValue,setSelectData,date,setData){
    $.ajax({
        type: "POST",
        dataType:"json",
        contentType: "application/json",
        url: base_url+"/create_description",
        data: JSON.stringify({"description":description,"description_links":description_links}),
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                setFormValue({
                    description:""
                });
                setSelectData([]);
                getDescriptions(date,setData);
                setOpen(false);
            }
            else{
                // call error
            }
        },
        error: function(exp) {
            // call error
        }
    });
}

export function createTransaction(transaction_date, transaction_amount, transaction_type, transaction_from_account_id, transaction_to_account_id, setOpen,setData,setFormValue){
    var old_date_obj = transaction_date
    transaction_date = process_date(transaction_date);
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/create_transaction",
        data: {"transaction_date":transaction_date,"transaction_amount":transaction_amount,"transaction_type":transaction_type,"transaction_from_account_id":transaction_from_account_id, "transaction_to_account_id":transaction_to_account_id},
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                getTransactions(old_date_obj, setData);
                setFormValue({
                    name: "",
                    amount: "",
                    from: "",
                    to: "",
                });
                setOpen(false);
            }
            else{
                // call error
            }
        },
        error: function(exp) {
            // call error
        }
    });
}

export function editAccount(account_id, account_name, account_type, account_description,handleClose,setData){
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/update_account",
        data: {"account_id":account_id,"account_name":account_name,"account_type":account_type,"account_description":account_description,"account_user_id":user_data["user_id"]},
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                getAccounts(setData);
                handleClose();
            }
            else{
                // call error
            }
        },
        error: function(exp) {
            // call error
        }
    });
}

export function createAccount(account_name, account_type, account_description,handleClose,setData){
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/create_account",
        data: {"account_name":account_name,"account_type":account_type,"account_description":account_description,"account_user_id":user_data["user_id"]},
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                getAccounts(setData);
                handleClose();
            }
            else{
                // call error
            }
        },
        error: function(exp) {
            // call error
        }
    });
}

export function deleteAccount(account_id,handleClose,setData){
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/delete_account",
        data: {"account_id":account_id},
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                getAccounts(setData);
                handleClose();
            }
            else{
                // call error
            }
        },
        error: function(exp) {
            // call error
        }
    });
}