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
          // Lakukan tindakan setelah login berhasil, misalnya menyimpan token atau mengalihkan halaman
          console.log(data);

          // Menyimpan token dalam cookie
          Cookies.set("login", data.token, {
            expires: 1, // 1 day
            sameSite: "Strict",
            secure: true,
            domain: "www.do.my.id",
            path: "/",
          });

          // Menampilkan greeting menggunakan SweetAlert
          Swal.fire({
            icon: "success",
            title: "Welcome!",
            text: `Hello, ${data.user.name}!`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "/dashboard";
          });
        } else {
          console.error("Login failed:", data.message);
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: data.message,
          });
        }
      } catch (error) {
        console.error("Error handling credential response:", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "An error occurred while processing your login. Please try again.",
        });
      }
    };


});


