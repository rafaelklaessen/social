defmodule Social.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :name, :string
      add :password, :string
      add :email, :string
      add :bio, :string
      add :location, :string
      add :website, :string
      add :birthday, :string
      add :profile_picture, :string
      add :banner, :string
      add :theme_color, :string
      add :settings, :string
      add :following, :string
      add :followers, :string
      add :likes, :string
      add :lists, :string

      timestamps()
    end

    create unique_index(:users, [:username])
    create unique_index(:users, [:email])

  end
end
