const API_BASE_URL = "http://localhost:9090"
let employees = []
let deleteEmployeeId = null

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  // Show dashboard after splash screen
  setTimeout(() => {
    document.getElementById("splash-screen").style.display = "none"
    document.getElementById("main-dashboard").classList.remove("hidden")
    loadEmployees()
  }, 3000)

  // Event listeners
  document.getElementById("add-employee-btn").addEventListener("click", openAddModal)
  document.getElementById("add-employee-form").addEventListener("submit", handleAddEmployee)
  document.getElementById("edit-employee-form").addEventListener("submit", handleEditEmployee)
  document.getElementById("search-input").addEventListener("input", handleSearch)

  // Close modals on overlay click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      e.target.closest(".modal").classList.add("hidden")
    })
  })
})

// Load employees from API
async function loadEmployees() {
  const tableBody = document.getElementById("employee-table-body")
  const loadingState = document.getElementById("loading-state")
  const emptyState = document.getElementById("empty-state")
  const errorState = document.getElementById("error-state")

  // Show loading
  tableBody.innerHTML = ""
  loadingState.classList.remove("hidden")
  emptyState.classList.add("hidden")
  errorState.classList.add("hidden")

  try {
    const response = await fetch(`${API_BASE_URL}/employees`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    employees = await response.json()

    loadingState.classList.add("hidden")

    if (employees.length === 0) {
      emptyState.classList.remove("hidden")
    } else {
      renderEmployees(employees)
      updateStats()
    }
  } catch (error) {
    console.error("[v0] Error loading employees:", error)
    loadingState.classList.add("hidden")
    errorState.classList.remove("hidden")
    document.getElementById("error-message").textContent = error.message
  }
}

// Render employees in table
function renderEmployees(employeeList) {
  const tableBody = document.getElementById("employee-table-body")
  const emptyState = document.getElementById("empty-state")

  if (employeeList.length === 0) {
    tableBody.innerHTML = ""
    emptyState.classList.remove("hidden")
    return
  }

  emptyState.classList.add("hidden")

  tableBody.innerHTML = employeeList
    .map(
      (employee) => `
        <tr>
            <td>${employee.id}</td>
            <td>${escapeHtml(employee.name)}</td>
            <td>${escapeHtml(employee.email)}</td>
            <td>${escapeHtml(employee.department)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon-only btn-edit" onclick="openEditModal(${employee.id})">
                        ✏️ Edit
                    </button>
                    <button class="btn-icon-only btn-delete" onclick="openDeleteModal(${employee.id}, '${escapeHtml(employee.name)}')">
                        🗑️ Delete
                    </button>
                </div>
            </td>
        </tr>
    `,
    )
    .join("")
}

// Update statistics
function updateStats() {
  document.getElementById("total-employees").textContent = employees.length

  const uniqueDepartments = [...new Set(employees.map((emp) => emp.department))]
  document.getElementById("total-departments").textContent = uniqueDepartments.length
}

// Handle search
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase()
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm) ||
      emp.email.toLowerCase().includes(searchTerm) ||
      emp.department.toLowerCase().includes(searchTerm) ||
      emp.id.toString().includes(searchTerm),
  )
  renderEmployees(filteredEmployees)
}

// Add Employee Modal
function openAddModal() {
  document.getElementById("add-employee-modal").classList.remove("hidden")
  document.getElementById("add-employee-form").reset()
}

function closeAddModal() {
  document.getElementById("add-employee-modal").classList.add("hidden")
}

async function handleAddEmployee(e) {
  e.preventDefault()

  const form = e.target
  const submitBtn = form.querySelector('button[type="submit"]')
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")

  // Show loading state
  btnText.classList.add("hidden")
  btnLoading.classList.remove("hidden")
  submitBtn.disabled = true

  const employeeData = {
    name: document.getElementById("add-name").value,
    email: document.getElementById("add-email").value,
    department: document.getElementById("add-department").value,
  }

  try {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    await loadEmployees()
    closeAddModal()
    showNotification("Employee added successfully!", "success")
  } catch (error) {
    console.error("[v0] Error adding employee:", error)
    showNotification("Failed to add employee. Please try again.", "error")
  } finally {
    // Reset button state
    btnText.classList.remove("hidden")
    btnLoading.classList.add("hidden")
    submitBtn.disabled = false
  }
}

// Edit Employee Modal
function openEditModal(employeeId) {
  const employee = employees.find((emp) => emp.id === employeeId)
  if (!employee) return

  document.getElementById("edit-id").value = employee.id
  document.getElementById("edit-name").value = employee.name
  document.getElementById("edit-email").value = employee.email
  document.getElementById("edit-department").value = employee.department

  document.getElementById("edit-employee-modal").classList.remove("hidden")
}

function closeEditModal() {
  document.getElementById("edit-employee-modal").classList.add("hidden")
}

async function handleEditEmployee(e) {
  e.preventDefault()

  const form = e.target
  const submitBtn = form.querySelector('button[type="submit"]')
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")

  // Show loading state
  btnText.classList.add("hidden")
  btnLoading.classList.remove("hidden")
  submitBtn.disabled = true

  const employeeId = document.getElementById("edit-id").value
  const employeeData = {
    id: Number.parseInt(employeeId),
    name: document.getElementById("edit-name").value,
    email: document.getElementById("edit-email").value,
    department: document.getElementById("edit-department").value,
  }

  try {
    const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    await loadEmployees()
    closeEditModal()
    showNotification("Employee updated successfully!", "success")
  } catch (error) {
    console.error("[v0] Error updating employee:", error)
    showNotification("Failed to update employee. Please try again.", "error")
  } finally {
    // Reset button state
    btnText.classList.remove("hidden")
    btnLoading.classList.add("hidden")
    submitBtn.disabled = false
  }
}

// Delete Employee Modal
function openDeleteModal(employeeId, employeeName) {
  deleteEmployeeId = employeeId
  document.getElementById("delete-employee-name").textContent = employeeName
  document.getElementById("delete-modal").classList.remove("hidden")
}

function closeDeleteModal() {
  document.getElementById("delete-modal").classList.add("hidden")
  deleteEmployeeId = null
}

async function confirmDelete() {
  if (!deleteEmployeeId) return

  const deleteBtn = document.querySelector("#delete-modal .btn-danger")
  const btnText = deleteBtn.querySelector(".btn-text")
  const btnLoading = deleteBtn.querySelector(".btn-loading")

  // Show loading state
  btnText.classList.add("hidden")
  btnLoading.classList.remove("hidden")
  deleteBtn.disabled = true

  try {
    const response = await fetch(`${API_BASE_URL}/employees/${deleteEmployeeId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    await loadEmployees()
    closeDeleteModal()
    showNotification("Employee deleted successfully!", "success")
  } catch (error) {
    console.error("[v0] Error deleting employee:", error)
    showNotification("Failed to delete employee. Please try again.", "error")
  } finally {
    // Reset button state
    btnText.classList.remove("hidden")
    btnLoading.classList.add("hidden")
    deleteBtn.disabled = false
  }
}

// Utility: Show notification (simple console log for now)
function showNotification(message, type) {
  console.log(`[v0] Notification (${type}):`, message)
  // You can implement a toast notification system here
  alert(message)
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
