const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "86763b7999msh4744f543fd3739dp17a99fjsncb130a88d1fe",
    "X-RapidAPI-Host": "ip-geolocation-and-threat-detection.p.rapidapi.com",
  },
};

const fetchIpInfo = async (ip) => {
  try {
    const res = await fetch(
      `https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`,
      OPTIONS
    );
    return await res.json();
  } catch (err) {
    return console.error(err);
  }
};

const fetchUserIp = async () => {
  try {
    const res = await fetch(`http://ip.jsontest.com/`);
    const res2 = await res.json();
    return res2.ip;
  } catch (err) {
    return console.error(err);
  }
};

const $ = (selector) => document.querySelector(selector);

const $exampleIp = $("#example_ip");
const $form = $("#form");
const $input = $("#input");
const $submit = $("#submit");
const $results = $("#results");

const userIp = await fetchUserIp();
$exampleIp.innerHTML = userIp;

if (userIp) {
	$results.innerHTML = `<strong>${JSON.stringify(await fetchIpInfo(userIp), null, 2)}</strong> (tu IP)`;
}

$form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { value } = $input;
  if (!value) return;

  $submit.setAttribute("disabled", "");
  $submit.setAttribute("aria-busy", "true");

  const ipInfo = await fetchIpInfo(value);

  if (ipInfo) {
    $results.innerHTML = JSON.stringify(ipInfo, null, 2);
  }

  $submit.removeAttribute("disabled");
  $submit.removeAttribute("aria-busy");
});
