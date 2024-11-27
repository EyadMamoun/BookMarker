var siteNameInput = document.getElementById('siteName');
var siteURLInput = document.getElementById('siteURL');

var regex = /^(https?:\/\/)/

var websitesList = [];

if(localStorage.getItem('links') != null)
    {
        for(var i=0 ; i<JSON.parse(localStorage.getItem('links')).length ; i++)
        {
            websitesList.push(JSON.parse(localStorage.getItem('links'))[i]);
        }
        displayList(JSON.parse(localStorage.getItem('links')));
    }

function insertURL()
{
    if((siteNameInput.value == '') || (siteURLInput.value == ''))
    {
        alert('Please complete the fields');
    }
    else if(regex.test(siteURLInput.value) == false)
    {
        alert('Please enter a valid URL');
    }
    else
    {
        var site = {
            name: siteNameInput.value,
            link: siteURLInput.value
        }

        websitesList.push(site);
        localStorage.setItem('links',JSON.stringify(websitesList));
        displayList(websitesList);
        clearForm();
    }
}

function displayList(arr)
{

    var box="";
    for(var i=0 ; i<arr.length ; i++)
    {
        box += `<tr>
                <td>${i+1}</td>
                <td>${arr[i].name}</td>
                <td>
                <button class="btn btn-success">
                    <i class="fa-solid fa-eye bg-transparent text-white px-1"></i>
                    <a class="linkDecoration" href="${arr[i].link}" target="_blank">Visit</a>
                </button>
                </td>
                <td>
                <button onclick="deleteItem(${i})" class="btn btn-danger">
                    <i class="fa-solid fa-trash-can bg-transparent text-white px-1"></i>Delete
                </button>
                </td>
            </tr>`
    }
    document.getElementById('insert').innerHTML = box;
}

function clearForm()
{
    siteNameInput.value = '';
    siteURLInput.value = '';
}

function deleteItem(index)
{
    websitesList.splice(index,1);
    localStorage.setItem('links',JSON.stringify(websitesList));
    displayList(websitesList);
}
