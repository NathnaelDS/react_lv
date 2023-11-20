defmodule ReactLvWeb.ThermostatLive do
  # In Phoenix v1.6+ apps, the line is typically: use MyAppWeb, :live_view
  use Phoenix.LiveView
  import PhoenixLiveReact

  def render(assigns) do
    ~H"""
    <div class="border-2 border-purple-500 p-4">
      <p class="text-xs italic text-purple-500">Liveview</p>
      <h1 class="text-2xl">
        Current temperature: <%= @temperature %>°F
        <button class="border-4 px-4" phx-click="inc_temperature">+</button>
      </h1>
    </div>

    <%= live_react_component("Components.MyComponent", [], id: "my-component-1") %>

    <div class="border-2 border-purple-500 p-4 mt-8 p-4 space-y-2">
      <p class="text-xs italic text-purple-500">Liveview</p>
      <p>Send an event from liveview to react ⚡️</p>
      <button class="border-4 px-4" phx-click="send_to_react">Send</button>
    </div>

    <span class="border-blue-500 text-blue-500"></span>
    """
  end

  def mount(_params, _session, socket) do
    # Let's assume a fixed temperature for now
    temperature = 70
    {:ok, assign(socket, :temperature, temperature)}
  end

  def handle_event("inc_temperature", _params, socket) do
    {:noreply, update(socket, :temperature, &(&1 + 1))}
  end

  def handle_event("react_button_click", _params, socket) do
    {:noreply, update(socket, :temperature, &(&1 + 1))}
  end

  def handle_event("send_to_react", _params, socket) do
    {:noreply, push_event(socket, "scores", %{points: Enum.random(0..100), user: "josé"})}
  end
end
