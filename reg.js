function startEnrollment() {
    document.getElementById('startEnrollmentButton').style.display = 'none';
    document.getElementById('enrollmentContainer').style.display = 'block';
}

function validateForm() {
    var firstName = document.getElementById('firstName').value.trim();
    var lastName = document.getElementById('lastName').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var address = document.getElementById('address').value.trim();
    var gender = document.getElementById('gender').value.trim();
    var skillsInput = document.getElementById('skillsInput').value.trim();

    if (!firstName || !lastName || !email || !phone || !address || !gender || !skillsInput) {
        displayAlert('All fields are required.');
        return false;
    }

    if (firstName.length < 1 || lastName.length < 1 || email.length < 1 || phone.length < 1 || address.length < 1 || gender.length < 1 || skillsInput.length < 1) {
        displayAlert('Each field must contain at least one character.');
        return false;
    }

    enrollStudent(firstName, lastName, email, phone, address, gender, skillsInput);
    return false;
}

function displayAlert(message) {
    var alertMessage = document.getElementById('alertMessage');
    if (!alertMessage) {
        alertMessage = document.createElement('div');
        alertMessage.id = 'alertMessage';
        document.getElementById('enrollmentContainer').insertBefore(alertMessage, document.getElementById('enrollmentForm'));
    }
    alertMessage.textContent = message;
}

function showAdditionalFields() {
    document.getElementById('additionalFields').style.display = 'block';
    document.querySelector("button[onclick='showAdditionalFields()']").classList.add('hidden');
}

function showGenderOptions() {
    document.getElementById('genderOptions').style.display = 'block';
}

function selectGender(radio) {
    document.getElementById('gender').value = radio.value;
    document.getElementById('genderOptions').style.display = 'none';
}

function showSkillsOptions() {
    document.getElementById('skillsOptions').style.display = 'block';
}

function selectSkill(checkbox) {
    var skillsInput = document.getElementById('skillsInput');
    var selectedSkills = Array.from(document.querySelectorAll("input[name='skillsOption']:checked")).map(cb => cb.value);
    skillsInput.value = selectedSkills.join(', ');
}

function enrollStudent(firstName, lastName, email, phone, address, gender, skillsInput) {
    var studentList = document.getElementById('studentList');
    var studentItem = document.createElement('li');
    studentItem.textContent = `Name: ${firstName} ${lastName}, Email: ${email}, Phone: ${phone}, Address: ${address}, Gender: ${gender}, Skills: ${skillsInput}`;
    
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function () {
        studentList.removeChild(studentItem);
    };
    studentItem.appendChild(removeButton);

    studentList.appendChild(studentItem);
    clearForm();
}

function clearForm() {
    document.getElementById('enrollmentForm').reset();
    document.getElementById('additionalFields').style.display = 'none';
    document.querySelector("button[onclick='showAdditionalFields()']").classList.remove('hidden');
    document.getElementById('gender').value = '';
    document.getElementById('skillsInput').value = '';
    var alertMessage = document.getElementById('alertMessage');
    if (alertMessage) {
        alertMessage.remove();
    }
}
