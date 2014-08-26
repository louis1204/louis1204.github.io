
window.onload = function() {
	var linkedin_button = document.getElementById('linkedin-button');
	var github_button = document.getElementById('github-button');
	var email_button = document.getElementById('email-button');
	var resume_button = document.getElementById('resume-button');

	linkedin_button.style.cursor = 'pointer';
	linkedin_button.onclick = function() {
		window.location = 'https://www.linkedin.com/pub/louis-wong/41/573/173';
	}
	
	github_button.style.cursor = 'pointer';
	github_button.onclick = function() {
		window.location = 'https://github.com/louis1204/';
	}

	email_button.style.cursor = 'pointer';
	email_button.onclick = function() {
		window.location = 'mailto:louis1204@gmail.com';
	}
	
	resume_button.style.cursor = 'pointer';
	resume_button.onclick = function() {
		window.location = 'images/LouisWongResume5.pdf';
	}
}