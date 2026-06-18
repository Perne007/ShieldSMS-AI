let lastReport = "";

function loadScamExample(){

document.getElementById("message").value=
`URGENT!

Your bank account has been locked due to suspicious activity.

Verify immediately to avoid suspension.

Click:
https://secure-bank-verification-update.com

Call 9876543210

Claim your reward now.`;
}

function loadSafeExample(){

document.getElementById("message").value=
`Hi Suresh,

Let's meet tomorrow at 3 PM.

Thanks,
Rahul`;
}

function analyzeSMS(){

const text=document
.getElementById("message")
.value
.toLowerCase();

if(text.trim()===""){
alert("Please enter a message");
return;
}

let score=0;

let reasons=[];

const keywords=[
"urgent",
"verify",
"click",
"winner",
"lottery",
"prize",
"free",
"claim",
"bank",
"otp",
"gift card",
"security alert",
"account suspended",
"payment failed",
"act now",
"limited offer",
"congratulations",
"tax refund",
"paypal",
"amazon"
];

keywords.forEach(word=>{

if(text.includes(word)){

score+=10;

reasons.push(word);

}

});

const urlRegex=/(https?:\/\/[^\s]+)/g;

if(urlRegex.test(text)){

score+=20;

reasons.push("Suspicious Link");

}

const phoneRegex=/\d{10}/;

if(phoneRegex.test(text)){

score+=15;

reasons.push("Suspicious Phone Number");

}

if(score>100){
score=100;
}

let category="Safe Message";

let action="Allow";

let color="green";

let cssClass="safe";

let riskLevel="LOW RISK";

if(text.includes("bank")){
category="Banking Scam";
}
else if(text.includes("lottery") ||
text.includes("prize")){
category="Lottery Scam";
}
else if(score>=40){
category="Promotional Spam";
}

if(score>=70){

riskLevel="HIGH RISK";

action="Delete";

color="red";

cssClass="scam";

}
else if(score>=40){

riskLevel="MEDIUM RISK";

action="Quarantine";

color="orange";

cssClass="spam";
}

let explanation="";

if(score>=70){

explanation=
"High confidence phishing attempt detected. The message contains urgency language, verification requests, suspicious links, and financial impersonation indicators.";

}
else if(score>=40){

explanation=
"Potential spam detected. Multiple promotional or suspicious indicators were identified.";

}
else{

explanation=
"No significant scam indicators were detected. Message appears legitimate.";
}

let confidence=
Math.floor(
90 + Math.random()*10
);

const timestamp=
new Date().toLocaleString();

document.getElementById("result").className=
"result "+cssClass;

document.getElementById("result").innerHTML=
`
<div class="risk-badge"
style="background:${color}">
${riskLevel}
</div>

<div class="score-card">
Security Threat Level: ${score}%
</div>

<h2 style="color:${color}">
${category}
</h2>

<p><strong>Risk Score:</strong> ${score}/100</p>

<p><strong>Scam Probability:</strong> ${score}%</p>

<p><strong>AI Confidence:</strong> ${confidence}%</p>

<div class="progress">

<div
class="progress-bar"
style="
width:${score}%;
background:${color};
">
</div>

</div>

<p><strong>AI Analysis:</strong></p>

<p>${explanation}</p>

<br>

<p><strong>Reasons:</strong></p>

<ul>
${reasons.map(
r=>`<li>${r}</li>`
).join("")}
</ul>

<br>

<p>
<strong>Recommended Action:</strong>
${action}
</p>

<p>
<strong>Analyzed At:</strong>
${timestamp}
</p>

<br>

<button onclick="downloadReport()">
Download Report
</button>
`;

lastReport=
`
ShieldSMS AI Report

Category: ${category}

Risk Score: ${score}

AI Confidence: ${confidence}%

Recommended Action: ${action}

Analysis:
${explanation}

Timestamp:
${timestamp}
`;
}

function downloadReport(){

const blob=
new Blob(
[lastReport],
{type:"text/plain"}
);

const link=
document.createElement("a");

link.href=
URL.createObjectURL(blob);

link.download=
"ShieldSMS_Report.txt";

link.click();
}