// The directory where JSON files are stored
const DATA_DIR = './data';

// Function to fetch the list of files in the directory
async function fetchFileList() {
    try {
        const response = await fetch(`${DATA_DIR}/file-list.json`);
        const files = await response.json();
        populateFileSelector(files);
    } catch (error) {
        console.error('Error fetching file list:', error);
    }
}

// Populate the dropdown with file names
function populateFileSelector(files) {
    const select = document.getElementById('jsonFiles');
    files.forEach(file => {
        const option = document.createElement('option');
        option.value = file;
        option.textContent = file;
        select.appendChild(option);
    });

    // Add change event listener to load selected file
    select.addEventListener('change', () => loadFileContent(select.value));
}

// Load and display the content of the selected file
async function loadFileContent(fileName) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(`${DATA_DIR}/${fileName}`);
        const jsonData = await response.json();
        renderJSONData(jsonData);
    } catch (error) {
        contentDiv.innerHTML = 'Error loading file.';
        console.error('Error loading JSON file:', error);
    }
}

// Render JSON data into the page
function renderJSONData(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// Fetch and display the file list on page load
fetchFileList();
