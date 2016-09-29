defmodule Social.Repo.Migrations.CreateStatus do
  use Ecto.Migration

  def change do
    create table(:status) do
      add :content, :string
      add :media, :string
      add :mentions, :text
      add :hashtags, :text
      add :owner, :integer

      timestamps()
    end

  end
end
