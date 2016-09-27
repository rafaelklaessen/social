defmodule Social.SettingsController do
  use Social.Web, :controller

  plug :assign_settings_title, "Social / Settings"

  def index(conn, _params) do
    redirect conn, to: "/settings/account"
  end

  def account(conn, _params) do
    render conn, "account.html"
  end

  def security(conn, _params) do
    render conn, "security.html"
  end

  def password(conn, _params) do
    render conn, "password.html"
  end

  def payments(conn, _params) do
    render conn, "payments.html"
  end

  def orders(conn, _params) do
    render conn, "orders.html"
  end

  def add_phone(conn, _params) do
    render conn, "add_phone.html"
  end

  def devices(conn, _params) do
    render conn, "devices.html"
  end

  def notifications(conn, _params) do
    render conn, "notifications.html"
  end

  def notifications_timeline(conn, _params) do
    render conn, "notifications_timeline.html"
  end

  def web_notifications(conn, _params) do
    render conn, "web_notifications.html"
  end

  def muted_following(conn, _params) do
    render conn, "muted_following.html"
  end

  def blocked(conn, _params) do
    render conn, "blocked.html"
  end

  def applications(conn, _params) do
    render conn, "applications.html"
  end

  def widgets(conn, _params) do
    render conn, "widgets.html"
  end

  def your_social_data(conn, _params) do
    render conn, "your_social_data.html"
  end

  def accessibility(conn, _params) do
    render conn, "accessibility.html"
  end

  defp assign_settings_title(conn, title) do
    assign(conn, :page_title, title)
  end
end
