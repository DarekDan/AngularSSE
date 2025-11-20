using System.Net.Http.Headers;
using System.Text;

namespace AngularSSE.CLI;

class Program
{
    static async Task Main(string[] args)
    {
        Console.WriteLine("AngularSSE CLI");
        Console.WriteLine("Enter message to send (or 'exit' to quit):");

        using var client = new HttpClient();
        client.BaseAddress = new Uri("http://localhost:8081");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "secret-token-123");

        while (true)
        {
            Console.Write("> ");
            var message = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(message)) continue;
            if (message.Equals("exit", StringComparison.OrdinalIgnoreCase)) break;

            try
            {
                var content = new StringContent(message, Encoding.UTF8, "text/plain");
                var response = await client.PostAsync("/api/message", content);

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Message sent successfully.");
                }
                else
                {
                    Console.WriteLine($"Error sending message: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
        }
    }
}
