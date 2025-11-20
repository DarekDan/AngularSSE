# CLI Module

C# Console Application to send messages to the backend.

## Prerequisites
- .NET SDK 8.0

## Running Locally
1.  Navigate to `cli` directory.
2.  Run `dotnet run`.
3.  Type a message and press Enter.

## Docker
1.  Build Image: `docker build -t cli .`
2.  Run: `docker run -it --network host cli` (Network host needed to access localhost:8080)
