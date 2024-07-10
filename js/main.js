/**
 * Dropdown menu
 */
document.addEventListener('DOMContentLoaded', function() {
    const menus = document.querySelectorAll('.navbar-burger');
    const dropdowns = document.querySelectorAll('.navbar-menu');

    if (menus.length && dropdowns.length) {
        for (var i = 0; i < menus.length; i++) {
            menus[i].addEventListener('click', function() {
                for (var j = 0; j < dropdowns.length; j++) {
                    dropdowns[j].classList.toggle('is-active');
                }
            });
        }
    }

    window.handleCredentialResponse = async (response) => {
      try {
        const res = await fetch(
          "https://asia-southeast2-awangga.cloudfunctions.net/domyid/auth/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: response.credential }),
          }
        );

        const data = await res.json(); // Parse JSON response

        if (res.ok) {
          // Save token to cookies
          console.log(data);
          Cookies.set("login", data.token, {
            expires: 1, // 1 day
            sameSite: "Strict",
            secure: true,
            path: "/", // Ensure the path is set to root
          });

        //  Redirect to dashboard
          window.location.href = "/dashboard"; // Ganti dengan URL dashboard Anda
        } else {
          console.error("Login failed:", data.message);
          alert("Login failed: " + data.message);
        }
      } catch (error) {
        console.error("Error handling credential response:", error);
        alert(
          "An error occurred while processing your login. Please try again."
        );
      }
    };

});


