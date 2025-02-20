FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
# Copy the entire backend directory
COPY . .
RUN dotnet restore "./ReserveHub.API/ReserveHub.API.csproj"
WORKDIR "/src/ReserveHub.API"
RUN dotnet build "ReserveHub.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ReserveHub.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ReserveHub.API.dll"] 