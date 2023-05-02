import $ from "jquery";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

let user_data = {}
const base_url = "http://127.0.0.1:5000";
const MySwal = withReactContent(Swal)

function saveToLocalStorage(){
    localStorage.setItem('user_id', user_data["user_id"]);
    localStorage.setItem('user_company_name', user_data["user_company_name"]);
}

function displayError(msg){
    if (msg === null || msg === undefined){
        msg = "Server Error";
        MySwal.fire({
            title: <p>Something Went Wrong</p>,
            icon: 'error',
            text: msg,
        });
        return;
    }
    MySwal.fire({
        icon: 'warning',
        text: msg,
    });
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

export function getUser(){
    return user_data["user_company_name"];
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
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
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
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
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
                    displayError(data.description);
                    return [];
                }
            }).fail( function(exp) {
                displayError();
                return [];
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
                    displayError(data.description);
                    return [];
                }
            }).fail( function(exp) {
                displayError();
                return [];
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
                    displayError(data.description);
                    return [];
                }
            }).fail( function(exp) {
                displayError();
                return [];
        });
}

export function editTransactionReader(transaction_id, setFormValue, handleOpen){
    return $.ajax({
        type: "GET",
        dataType:"json",
        url: base_url+"/read_transaction",
        data: {"transaction_id":transaction_id}}).then(
            function(data) {
                console.log(data);
                if (data.status == 1){
                    if (data.data.transaction_description === null){
                        data.data.transaction_description = "";
                    }
                    setFormValue({
                        amount: data.data.transaction_amount,
                        from: data.data.transaction_from_account_id,
                        to: data.data.transaction_to_account_id,
                    });
                    handleOpen();
                    return data.data;
                }
                else{
                    displayError(data.description);
                    return [];
                }
            }).fail( function(exp) {
                displayError();
                return [];
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
                    displayError(data.description);
                    return [];
                }
            }).fail( function(exp) {
                displayError();
                return [];
        });
}

export function editDescriptionReader(description_id, setFormValue, setOpen){
    return $.ajax({
        type: "GET",
        dataType:"json",
        url: base_url+"/read_description",
        data: {"description_id":description_id}}).then(
            function(data) {
                console.log(data);
                if (data.status == 1){
                    if (data.data.description === null){
                        data.data.description = "";
                    }
                    setFormValue({
                        description: data.data.description,
                      });
                    setOpen(true);
                    return data.data;
                }
                else{
                    displayError(data.description);
                    return [];
                }
            }).fail( function(exp) {
                displayError();
                return [];
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
                    displayError(data.description);
                    return [];
                }
            }).fail( function(exp) {
                displayError();
                return [];
        });
}

export function isEmpty(item){
    return item === null || item === "" || item === undefined
}

export function setDescription(description,description_links,handleClose,date,setData){
    $.ajax({
        type: "POST",
        dataType:"json",
        contentType: "application/json",
        url: base_url+"/create_description",
        data: JSON.stringify({"description":description,"description_links":description_links}),
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                getDescriptions(date,setData);
                handleClose(true);
            }
            else{
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
        }
    });
}

export function editDescription(description_id,description,handleClose,date,setData){
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/update_description",
        data: {"description":description,"description_id":description_id},
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                getDescriptions(date,setData);
                handleClose(false);
            }
            else{
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
        }
    });
}
export function createTransaction(transaction_date, transaction_amount, transaction_from_account_id, transaction_to_account_id, setData,handleClose){
    var old_date_obj = transaction_date
    transaction_date = process_date(transaction_date);
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/create_transaction",
        data: {"transaction_date":transaction_date,"transaction_amount":transaction_amount,"transaction_from_account_id":transaction_from_account_id, "transaction_to_account_id":transaction_to_account_id},
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                getTransactions(old_date_obj, setData);
                handleClose();
            }
            else{
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
        }
    });
}

export function editTransaction(date,transaction_id, transaction_amount, transaction_from_account_id, transaction_to_account_id, setData,handleClose){
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/update_transaction",
        data: {"transaction_id":transaction_id,"transaction_amount":transaction_amount,"transaction_from_account_id":transaction_from_account_id, "transaction_to_account_id":transaction_to_account_id},
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                getTransactions(date, setData);
                handleClose();
            }
            else{
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
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
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
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
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
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
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
        }
    });
}

export function deleteTransaction(transaction_id,date,handleClose,setData,setData2){
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/delete_transaction",
        data: {"transaction_id":transaction_id},
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                getTransactions(date, setData);
                getDescriptions(date, setData2);
                handleClose();
            }
            else{
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
        }
    });
}

export function deleteDescription(description_id,date,handleClose,setData){
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/delete_description",
        data: {"description_id":description_id},
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                getDescriptions(date, setData);
                handleClose();
            }
            else{
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
        }
    });
}

function setDictData(dict, sno, particular, debit, credit){
    console.log(sno,particular, debit, credit);
    dict["sno"] = sno;
    dict["particular"] = particular;
    dict["debit"] = debit;
    dict["credit"] = credit;
    return dict;
}

function addToData(journal, count, data){
    var cur_entry = {};
    cur_entry = setDictData(cur_entry, count, "From "+data.from_account, data.transaction_amount + " AED", "");
    journal.push(cur_entry);
    count++;
    var cur_entry2 = {};
    cur_entry2 = setDictData(cur_entry2, count, "To "+data.to_account, "", data.transaction_amount + " AED");
    journal.push(cur_entry2);
    count++;
    return count;
}

export function getDailyJournal(transaction_date, setData){
    transaction_date = process_date(transaction_date);
    return $.ajax({
        type: "GET",
        dataType:"json",
        url: base_url+"/get_daily_journal",
        data: {"user_id":user_data["user_id"], "transaction_date":transaction_date}}).then(
            function(data) {
                console.log(data);
                if (data.status == 1){
                    var datas = data.data;
                    var journal = [];
                    var count = 1
                    for (var i=0; i<datas.length; i++){
                        if (isEmpty(datas[i].description_id)){
                            count = addToData(journal, count, datas[i]);
                        }
                        else{
                            var cur_description_id = datas[i].description_id;
                            var to_accounts = [];
                            var from_accounts = [];
                            var data_accounts = [];
                            for (var j=i; j<datas.length; j++){
                                if (datas[j].description_id == cur_description_id){
                                    to_accounts.push(datas[j].to_account);
                                    from_accounts.push(datas[j].from_account);
                                    data_accounts.push(datas[j]);
                                }
                                else{
                                    break;
                                }
                            }
                            if (data_accounts.length == 1){
                                count = addToData(journal, count, datas[i]);
                            }
                            else{
                                if ([... new Set(to_accounts)].length == 1){
                                    var total_amount = 0;
                                    for (var k=0; k<data_accounts.length; k++){
                                        var cur_entry = {};
                                        cur_entry = setDictData(cur_entry, count, "From "+data_accounts[k].from_account, data_accounts[k].transaction_amount + " AED", "");
                                        journal.push(cur_entry);
                                        total_amount += data_accounts[k].transaction_amount;
                                        count++;
                                    }
                                    var cur_entry = {};
                                    cur_entry = setDictData(cur_entry, count, "To "+data_accounts[0].to_account, "", total_amount + " AED");
                                    journal.push(cur_entry);
                                    count++;
                                    i += data_accounts.length-1;
                                }
                                else if ([... new Set(from_accounts)].length == 1){
                                    var total_amount = 0;
                                    for (var k=0; k<data_accounts.length; k++){
                                        total_amount += data_accounts[k].transaction_amount;
                                    }
                                    console.log(total_amount);
                                    var cur_entry = {};
                                    cur_entry = setDictData(cur_entry, count, "From "+data_accounts[0].from_account, total_amount + " AED", "");
                                    journal.push(cur_entry);
                                    count++;
                                    for (var k=0; k<data_accounts.length; k++){
                                        var cur_entry = {};
                                        cur_entry = setDictData(cur_entry, count, "To "+data_accounts[k].to_account, "", data_accounts[k].transaction_amount + " AED");
                                        journal.push(cur_entry);
                                        count++;
                                    }
                                    i += data_accounts.length-1;
                                }
                            }
                        }
                    }
                    setData(journal);
                    console.log(journal);
                    return journal;
                }
                else{
                    displayError(data.description);
                    return [];
                }
            }).fail( function(exp) {
                displayError();
                return [];
        });
}

export function getAccountReports(setData){
    return $.ajax({
        type: "GET",
        dataType:"json",
        url: base_url+"/get_account_reports",
        data: {"user_id":user_data["user_id"]}}).then(
            function(data) {
                console.log(data);
                if (data.status == 1){
                    setData(data.data);
                    return data.data;
                }
                else{
                    displayError(data.description);
                    return [];
                }
            }).fail( function(exp) {
                displayError();
                return [];
        });
}

export function helpThem(){
    MySwal.fire({
        title: <p>No.</p>,
        icon: 'info',
        text: "No help lol",
    });
    return;
}

export function deleteUserAccount(){
    $.ajax({
        type: "POST",
        dataType:"json",
        url: base_url+"/delete_user",
        data: {"user_id":user_data["user_id"]},
        success: function(data) {
            console.log(data);
            if (data.status == 1){
                localStorage.clear();
                redirect("signup")
            }
            else{
                displayError(data.description);
            }
        },
        error: function(exp) {
            displayError();
        }
    });
}