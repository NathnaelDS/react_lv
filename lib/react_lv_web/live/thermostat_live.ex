defmodule ReactLvWeb.ThermostatLive do
  # In Phoenix v1.6+ apps, the line is typically: use MyAppWeb, :live_view
  use Phoenix.LiveView
  import PhoenixLiveReact

  def render(assigns) do
    ~H"""
    Current temperature: <%= @temperature %>°F <button phx-click="inc_temperature">+</button>
    <%= live_react_component("Components.MyComponent", [], id: "my-component-1") %>
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
end
