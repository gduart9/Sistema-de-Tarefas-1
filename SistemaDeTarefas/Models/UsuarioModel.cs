using SistemaDeTarefas.Enums;

namespace SistemaDeTarefas.Models
{
    public class UsuarioModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public StatusTarefa Status { get; set; }
    }
}
