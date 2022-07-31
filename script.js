const fetchIpInfo = async (ip) => {
  try {
    const res = await fetch(`https://www.iplocate.io/api/lookup/${ip}`);
    return await res.json();
  } catch (err) {
    return console.error(err);
  }
};

const $ = (selector) => document.querySelector(selector);

const completeInfo = (jsonIp) => {
	$("#ip_address").innerHTML = jsonIp.ip;
	$("#isp").innerHTML = jsonIp.org;
	$("#country").innerHTML = jsonIp.country;
	$("#state").innerHTML = jsonIp.subdivision;
	$("#city").innerHTML = jsonIp.city;
	$("#maps_url").setAttribute("href", `https://www.google.com/maps/search/?api=1&query=${jsonIp.latitude},${jsonIp.longitude}`);
}

const $exampleIp = $("#example_ip");
const $form = $("#form");
const $input = $("#input");
const $submit = $("#submit");
const $jsonResults = $("#json_results");

const userIpInfo = await fetchIpInfo("");

if (userIpInfo) {
  $exampleIp.innerHTML = `<strong>${userIpInfo.ip}</strong> (tu IP)`;
  completeInfo(userIpInfo);
  $jsonResults.innerHTML = JSON.stringify(userIpInfo, null, 2);
}

$form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { value } = $input;
  if (!value) return;

  $submit.setAttribute("disabled", "");
  $submit.setAttribute("aria-busy", "true");

  const ipInfo = await fetchIpInfo(value);

  if (ipInfo) {
    completeInfo(ipInfo);
    $jsonResults.innerHTML = JSON.stringify(ipInfo, null, 2);
  }

  $submit.removeAttribute("disabled");
  $submit.removeAttribute("aria-busy");
});
