function comparator(a, b) {
  return a.EditCounts - b.EditCounts;
}

function getUpdatedPageCount(jsonData) {
  var handler = {
    get: function (target, name) {
      return target.hasOwnProperty(name) ? target[name] : 42;
    },
  };
  var resUserditCount = new Proxy({}, handler);
  var domainName = "en.wikipedia.org";
  for (var i = 0; i < jsonData.length; i++) {
    if (
      typeof jsonData[i].performer === "undefined" ||
      typeof jsonData[i].performer.user_is_bot === "undefined"
    ) {
      continue;
    }
    if (
      !jsonData[i].performer.user_is_bot &&
      jsonData[i].meta.domain.includes(domainName)
    ) {
      var userName = jsonData[i].performer.user_text;
      var userEditCount = jsonData[i].performer.user_edit_count;
      if (isNaN(userEditCount) || !Number.isInteger(userEditCount)) continue;
      resUserditCount[userName] = Math.max(
        resUserditCount[userName],
        userEditCount
      );
    }
  }
  var editCountArr = [];
  for (var key in resUserditCount) {
    var value = resUserditCount[key];
    var obj = {};
    obj["Name"] = key;
    obj["EditCounts"] = value;
    editCountArr.push(obj);
  }

  editCountArr.sort(comparator).reverse();
  if (editCountArr.length == 0) {
	document.getElementById("task2-header").innerText = "No user found who made changes to " + domainName;
    console.log("No user found who made changes to " + domainName);
  } else {
	document.getElementById("task2-header").innerText = "User(s) who made changes to " + domainName + ":";
	console.log("User(s) who made changes to " + domainName + ":");
    for (var i = 0; i < editCountArr.length; i++) {
	  console.log(editCountArr[i].Name, editCountArr[i].EditCounts);
	  document.getElementById("task2-content").innerHTML += editCountArr[i].Name + ": " + editCountArr[i].EditCounts+"<br>";	  
    }
  }
}
