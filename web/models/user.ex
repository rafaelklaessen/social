defmodule Social.User do
  use Social.Web, :model

  schema "users" do
    field :username, :string
    field :name, :string
    field :bio, :string
    field :location, :string
    field :website, :string
    field :birthday, :string
    field :profile_picture, :string
    field :banner, :string
    field :theme_color, :string
    field :settings, :string
    field :following, :string
    field :followers, :string
    field :likes, :string
    field :lists, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :name, :bio, :location, :website, :birthday, :profile_picture, :banner, :theme_color, :settings, :following, :followers, :likes, :lists])
    |> validate_required([:username, :name, :bio, :location, :website, :birthday, :profile_picture, :banner, :theme_color, :settings, :following, :followers, :likes, :lists])
  end
end
