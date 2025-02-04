// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-data');
    const tagsSelect = document.getElementById('tags');
    const resultContainer = document.querySelector('.result');

    // Event listener for form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevent the default form submit behavior

        const selectedTag = tagsSelect.value;

        // Check if the user has selected a tag
        if (!selectedTag) {
            alert('Please select a tag!');
            return;
        }

        try {
            // Fetch articles using Axios
            const response = await axios.get(`https://dev.to/api/articles?tag
=${selectedTag}`);

            // Check if we have results
            if (response.data && response.data.length > 0) {
                // Clear any previous results
                resultContainer.innerHTML = '';

                // Display the articles in the result section
                response.data.forEach(article => {
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');

                    articleDiv.innerHTML = `
              <h3>${article.title}</h3>
              <p>${article.description}</p>
              <a href="${article.url}" target="_blank">Read more</a>
            `;

                    resultContainer.appendChild(articleDiv);
                });
            } else {
                // If no articles found
                resultContainer.innerHTML = '<p>No articles found for this tag.</p>';
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            resultContainer.innerHTML = '<p>Sorry, there was an error fetching the articles. Please try again later.</p>';
        }
    });
});
