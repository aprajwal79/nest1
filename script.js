// DOM Elements
const dxfFileInput = document.getElementById('dxf-file');
const rulFileInput = document.getElementById('rul-file');
const dxfFileName = document.getElementById('dxf-file-name');
const rulFileName = document.getElementById('rul-file-name');
const dxfUploadBox = document.getElementById('dxf-upload');
const rulUploadBox = document.getElementById('rul-upload');
const processBtn = document.getElementById('process-btn');
const clearBtn = document.getElementById('clear-btn');
const downloadBtn = document.getElementById('download-btn');

// File upload handlers
dxfFileInput.addEventListener('change', function() {
    handleFileSelect(this, dxfFileName);
    checkFilesUploaded();
});

rulFileInput.addEventListener('change', function() {
    handleFileSelect(this, rulFileName);
    checkFilesUploaded();
});

// Click handlers for upload boxes
dxfUploadBox.addEventListener('click', function() {
    dxfFileInput.click();
});

rulUploadBox.addEventListener('click', function() {
    rulFileInput.click();
});

// Drag and drop handlers
setupDragAndDrop(dxfUploadBox, dxfFileInput, dxfFileName);
setupDragAndDrop(rulUploadBox, rulFileInput, rulFileName);

// Process button click handler
processBtn.addEventListener('click', function() {
    // Placeholder for actual processing functionality
    simulateProcessing();
});

// Clear button click handler
clearBtn.addEventListener('click', function() {
    resetFileInputs();
    downloadBtn.disabled = true;
    document.querySelector('.output-placeholder').innerHTML = '<p>No output generated yet</p>';
});

// Download button click handler
downloadBtn.addEventListener('click', function() {
    // Placeholder for actual download functionality
    alert('This would download the HLt file in a real implementation.');
});

// Helper Functions
function handleFileSelect(input, fileNameElement) {
    if (input.files && input.files[0]) {
        const fileName = input.files[0].name;
        fileNameElement.textContent = fileName;
        fileNameElement.style.color = '#27ae60';
        
        // Highlight the upload box to indicate successful upload
        input.parentElement.style.borderColor = '#27ae60';
    }
}

function checkFilesUploaded() {
    if (dxfFileInput.files.length > 0 && rulFileInput.files.length > 0) {
        processBtn.disabled = false;
    } else {
        processBtn.disabled = true;
    }
}

function resetFileInputs() {
    dxfFileInput.value = '';
    rulFileInput.value = '';
    dxfFileName.textContent = 'No file selected';
    rulFileName.textContent = 'No file selected';
    dxfFileName.style.color = '#666';
    rulFileName.style.color = '#666';
    dxfUploadBox.style.borderColor = '#ccc';
    rulUploadBox.style.borderColor = '#ccc';
    processBtn.disabled = true;
}

function setupDragAndDrop(dropZone, fileInput, fileNameElement) {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, function() {
            dropZone.style.borderColor = '#3498db';
        }, false);
    });
    
    // Remove highlight when item is dragged out or dropped
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, function() {
            dropZone.style.borderColor = '#ccc';
        }, false);
    });
    
    // Handle dropped files
    dropZone.addEventListener('drop', function(e) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelect(fileInput, fileNameElement);
        checkFilesUploaded();
    }, false);
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function simulateProcessing() {
    // Simulate processing delay
    processBtn.disabled = true;
    processBtn.textContent = 'Processing...';
    
    setTimeout(function() {
        // Update UI to indicate processing is complete
        processBtn.textContent = 'Process Files';
        processBtn.disabled = false;
        
        // Update output section
        document.querySelector('.output-placeholder').innerHTML = 
            '<p style="color: #27ae60;">Processing complete! HLt file is ready for download.</p>';
        
        // Enable download button
        downloadBtn.disabled = false;
    }, 2000);
} 