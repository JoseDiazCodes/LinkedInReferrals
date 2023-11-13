let trash = document.getElementsByClassName("fa-trash")
let favorite = document.getElementsByClassName("fa-envelope")

// Event listener for comment icon
Array.from(document.querySelectorAll(".comment-icon")).forEach(function (
	element
) {
	element.addEventListener("click", function () {
		const contactId = this.getAttribute("data-contact-id")
		const commentSection = document.querySelector(
			"#comment-section-" + contactId
		)
		commentSection.style.display =
			commentSection.style.display === "block" ? "none" : "block"
	})
})

// Event listener for adding a comment
Array.from(document.querySelectorAll(".btn-add-comment")).forEach(function (
	element
) {
	element.addEventListener("click", function () {
		const contactId = this.getAttribute("data-contact-id")
		const commentInput = document.querySelector(
			"#comment-section-" + contactId + " .comment-input"
		)
		const comment = commentInput.value

		if (comment.trim() === "") {
			console.log("Comment is empty, not sending request")
			return
		}

		fetch("/addComment", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contactId: contactId,
				comment: comment,
			}),
		})
			.then(function (response) {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then(function (data) {
				console.log("Comment added response:", data)
				window.location.reload()
			})
			.catch(function (error) {
				console.error("There was a problem with the fetch operation:", error)
			})
	})
})

Array.from(favorite).forEach(function (element) {
	element.addEventListener("click", function () {
		const name = this.parentNode.parentNode.childNodes[1].innerText
		const isFavorite = this.parentNode.parentNode.classList.contains("favorite")
		fetch("updateFavorite", {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: name,
				favorite: !isFavorite,
			}),
		})
			.then((response) => {
				if (response.ok) return response.json()
			})
			.then((data) => {
				console.log(data)
				window.location.reload()
			})
	})
})

Array.from(trash).forEach(function (element) {
	element.addEventListener("click", function () {
		const name = this.parentNode.parentNode.childNodes[1].innerText
		fetch("contacts", {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
			}),
		}).then(function (response) {
			window.location.reload()
		})
	})
})
