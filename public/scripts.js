$('document').ready(function () {
  $('#form > .input-group > #btn-submit').click(function (event) {
    testAccessibility(event);
  });
});

// set loading spinner
const setLoading = (isLoading = true) => {
  isLoading
    ? $('.loader').css('display', 'block')
    : $('.loader').css('display', 'none');
};

// get information from backend api
const testAccessibility = async (e) => {
  e.preventDefault();
  const url = $('#url').val();
  if (url?.length > 0) {
    setLoading();
    const response = await fetch(`/api/test?url=${url}`);
    if (response?.status != 200) {
      alert('Something went wrong');
    } else {
      const { issues } = await response.json();
      addIssuesToDOM(issues);
    }
    setLoading(false);
  } else {
    alert('Insert a valid URL');
  }
};

// add the issues to DOM
const addIssuesToDOM = (issues) => {
  const issuesOutput = $('#issues');
  issuesOutput.html('');

  if (issues.length > 0) {
    issues.map((issue) => {
      const output = `
                <div class="card mb-5">
                    <div class="card-body">
                        <h4>${issue.message}</h4>
                        
                        <p class="bg-light p-3 my-3">
                            ${escapeHTML(issue.context)}
                        </p>

                        <p class="bg-secondary text-light p-2">
                            CODE: ${issue.code}
                        </p>
                    </div>
                </div>
            `;
      issuesOutput.append(output);
    });
  } else {
    issuesOutput.html('No issues found!');
  }
};

// escape HTML
const escapeHTML = (html) => {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
