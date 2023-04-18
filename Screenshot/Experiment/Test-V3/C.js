const link1 = "https://twitter.com/akmalfirdxus/status/1646610766840119296";
const url = new URL(link1);

const pathParts = url.pathname.split("/");
const code1 = pathParts[1];
const code2 = pathParts[3];
const code3 = "dark"; // You can set this to any value you like

const link_code = `https://publish.twitter.com/?query=${link1}&theme=${code3}&widget=Tweet`;


console.log(link_code);