import Swal from "sweetalert2";
const sweetAlertaService = {
  alertaSucesso(title: string) {
    Swal.fire({
      icon: "success",
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  },

  alertaErro(title: string) {
    Swal.fire({
      icon: "error",
      title,
    });
  },

  confirmAlerta(title: string) {
    return Swal.fire({
      title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    });
  },
};

export default sweetAlertaService;
