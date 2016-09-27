defmodule Social.StatusController do
  use Social.Web, :controller

  plug :put_profile_layout, "user.html"

  def show(conn, %{"username" => username, "id" => id}) do
    # Get status content and put it in title (instead of Lorem Ipsum)
    conn
    |> assign(:page_title, "#{username} on Social: Lorem ipsum")
    |> assign(:username, username)
    |> assign(:id, id)
    |> render("show_status.html")
  end

  def create(conn, _params) do
    # Create status in database
    redirect conn, to: "/"
  end

  defp put_profile_layout(conn, layout_file) do
    put_layout conn, layout_file
  end
end
