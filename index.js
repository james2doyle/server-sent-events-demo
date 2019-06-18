document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const evtSource = new EventSource('/sse.php');
  evtSource.onopen = () => {
    output.innerHTML = 'Connection to server opened.';
  };
  evtSource.onerror = () => {
    output.innerHTML = 'EventSource failed.';
  };
  evtSource.onmessage = ({ data }) => {
    const { time } = JSON.parse(data);
    const formatted = new Intl.DateTimeFormat('en-CA', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(Date.parse(time));
    const code = document.createElement('p');
    code.textContent = formatted;
    output.insertBefore(code, output.firstChild);
  };
});
