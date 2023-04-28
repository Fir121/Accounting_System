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